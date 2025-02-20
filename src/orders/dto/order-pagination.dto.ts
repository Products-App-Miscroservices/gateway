import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

// Se podría hacer como una composición sobre la herencia, pero en Query parameters no es tan sencillo.
export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Valid status are ${OrderStatusList}`
    })
    status: OrderStatus;
}