import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";

// El id sí va en el microservicio, no acá.
export class UpdateReviewDto extends PartialType(CreateReviewDto) { }