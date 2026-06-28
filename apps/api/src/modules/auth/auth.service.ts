import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/database/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, password, name } = createAuthDto;

    // Check if user already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Generate JWT
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    // Find user
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }

  async validateUser(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }
}
