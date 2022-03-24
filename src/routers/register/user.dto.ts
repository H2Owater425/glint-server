import { IsEmail, IsHash, IsString, isHash } from "class-validator"

export default class UserDto {
  @IsEmail()
  public email: string
  
  @IsHash('sha256')
  public password: string

  @IsString()
  public name: string

}