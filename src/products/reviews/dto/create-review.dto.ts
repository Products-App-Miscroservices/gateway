import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsPositive, IsString, Max, MinLength } from "class-validator";

export class CreateReviewDto {
    @IsMongoId()
    authorId: string;

    @IsMongoId()
    productId: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @Max(5)
    rating: number;

    @IsString()
    @MinLength(4)
    comment: string;
}