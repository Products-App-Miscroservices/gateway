import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "src/products/products/dto/create-product.dto";

// El id sí va en el microservicio, no acá.
export class UpdateReviewDto extends PartialType(CreateProductDto) { }