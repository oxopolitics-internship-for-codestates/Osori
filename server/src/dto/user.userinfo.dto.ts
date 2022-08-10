import { IsNotEmpty, IsString } from 'class-validator';

export class userInfoDto {
  @IsNotEmpty()
  @IsString()
  userName: string;
}
