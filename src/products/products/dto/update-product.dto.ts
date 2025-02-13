import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";

// El Dto del microservicio lleva el id.
export class UpdateProductDto extends PartialType(CreateProductDto) { }