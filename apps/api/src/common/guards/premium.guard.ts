import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "../../modules/users/users.service";
import { ForbiddenPremiumException } from "../exceptions/forbidden-premium.exception";

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenPremiumException();
    }

    const user = await this.usersService.findById(userId);

    if (!user?.isPremium) {
      throw new ForbiddenPremiumException();
    }

    return true;
  }
}
