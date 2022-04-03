import {
  IsAlphanumeric,
  IsDateString,
  IsEmail,
  IsHash,
  IsString,
  Length,
} from 'class-validator'

// UserDto
export default class {
  @IsEmail()
  public email: string

  @IsString()
  @Length(1, 20)
  public name: string

  @IsAlphanumeric()
  @Length(4, 15)
  public id: string

  @IsHash('sha256')
  public password: string

  @IsDateString()
  public birth: string
}