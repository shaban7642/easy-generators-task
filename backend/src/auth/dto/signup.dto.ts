import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DTO_VALIDATOR } from '../../shared/constants/index';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(DTO_VALIDATOR.PASSWORD_REGEX, {
    message: DTO_VALIDATOR.PASSWORD_VALIDATOR_MESSAGE,
  })
  readonly password: string;
}
