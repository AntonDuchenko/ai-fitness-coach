import { ForbiddenException } from "@nestjs/common";

export class ForbiddenPremiumException extends ForbiddenException {
  constructor(message = "Premium subscription required") {
    super({
      statusCode: 403,
      message,
      error: "Forbidden",
      upgradeUrl: "/pricing",
    });
  }
}
