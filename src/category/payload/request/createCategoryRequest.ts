import { MaxLength } from "class-validator";

export class CreateCategoryRequest {
  @MaxLength(5)
  name: string;
}
