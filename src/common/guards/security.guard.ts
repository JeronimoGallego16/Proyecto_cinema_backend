import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface PermissionValidationResponse {
  allowed: boolean;
}

@Injectable()
export class SecurityGuard implements CanActivate {
  private readonly logger = new Logger(SecurityGuard.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(request.headers.authorization);
    console.log('Token extraído:', token); // Agrega este log para verificar el token
    const securityBaseUrl = this.configService.get<string>('MS_SECURITY');
    if (!securityBaseUrl) {
      this.logger.error('MS_SECURITY no esta configurada');
      throw new ServiceUnavailableException(
        'Servicio de seguridad no configurado',
      );
    }
    console.log('URL del servicio de seguridad:', securityBaseUrl); // Agrega este log para verificar la URL
    try {
      const response = await axios.post<PermissionValidationResponse>(
        `${securityBaseUrl}/api/internal/security/permissions-validation`,
        {
          url: request.path,
          method: request.method,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        },
      );
      console.log('Respuesta del servicio de seguridad:', response.data); // Agrega este log para verificar la respuesta
      if (response.data.allowed === true) return true;

      throw new ForbiddenException(
        'No tiene permiso para acceder a este recurso',
      );
    } catch (error) {
      console.error('Error al validar permisos:', error); // Agrega este log para verificar el error
      if (error instanceof ForbiddenException) throw error;

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        this.logger.warn(
          `Validacion de permisos rechazada: ${status ?? error.code ?? 'sin respuesta'}`,
        );

        if (status === 401) {
          throw new UnauthorizedException('Token invalido o expirado');
        }
        if (status === 403) {
          throw new ForbiddenException(
            'No tiene permiso para acceder a este recurso',
          );
        }
      }

      this.logger.error('No fue posible consultar el servicio de seguridad');
      throw new ServiceUnavailableException(
        'Servicio de seguridad no disponible',
      );
    }
  }

  private extractBearerToken(authorization?: string): string {

    if (!authorization) {
      throw new UnauthorizedException('Token de autorizacion faltante');
    }

    const parts = authorization.split(' ');
    const [scheme, token] = parts;
    if (scheme !== 'Bearer' || !token || parts.length !== 2) {
      throw new UnauthorizedException('Formato de Authorization invalido');
    }

    return token;
  }
}
