import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import mockToken from '../mock.response';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockTokenResponse = mockToken()

  beforeEach(async () => {
    
    const modRef = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          }
  
        }
      ]
    }).compile();
    
    
    service = modRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an access-token', async ()=>{

    jest.spyOn(service, 'login').mockImplementation(() =>
    Promise.resolve(
      {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTY5NjY4NjgsImV4cCI6MTYxNjk2NjkyOH0.b2eefmnnwc0SN8ZDFy4OB8HwtiYcgAG72sHB6DWwhL0"
      }),
    );

    const authResponse = await service.login({
      email:"user@user.com",
      _id:"2145",
    })

    expect(authResponse.access_token).toEqual(mockTokenResponse.access_token)
  
  })
});
