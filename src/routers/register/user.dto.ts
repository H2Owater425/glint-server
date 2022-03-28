import { IsAlpha, IsDateString, IsEmail, IsHash, IsString, Length} from 'class-validator'

export default class UserDto {
  @IsEmail()
  public email: string

  @IsString()
  @Length(1, 20)
  public name: string

  @IsAlpha()
  @Length(4, 25)
  public id: string

  @IsHash('sha256')
  public password: string

  @IsDateString()
  public birth: string
}
