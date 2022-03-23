import { IsEmail } from "class-validator"

export default class UserDto {
  @IsEmail()
  public email: string
}