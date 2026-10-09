import { ConflictException } from "@nestjs/common";
import type { CreateProfileDto } from "../users/dto/create-profile.dto";
import { OnboardingController } from "./onboarding.controller";

function setup(onboardingCompleted: boolean) {
  const usersService = {
    findById: jest
      .fn()
      .mockResolvedValue({ id: "u1", profile: { onboardingCompleted } }),
    createProfile: jest.fn().mockResolvedValue({ id: "p1" }),
    setPlanGenerationJobId: jest.fn(),
  };
  const planGeneration = {
    triggerPlanGeneration: jest.fn().mockResolvedValue("job-1"),
  };
  const controller = new OnboardingController(
    usersService as never,
    planGeneration as never,
    {} as never,
    {} as never,
    {} as never,
  );
  return { controller, usersService, planGeneration };
}

describe("OnboardingController.createProfile", () => {
  const req = { user: { id: "u1" } };
  const dto = {} as CreateProfileDto;

  it("queues plan generation during onboarding", async () => {
    const { controller, planGeneration } = setup(false);

    await expect(controller.createProfile(req, dto)).resolves.toEqual({
      profile: { id: "p1" },
      jobId: "job-1",
    });
    expect(planGeneration.triggerPlanGeneration).toHaveBeenCalledWith("u1");
  });

  it("rejects re-posting after onboarding so plans cannot be regenerated for free", async () => {
    const { controller, usersService, planGeneration } = setup(true);

    await expect(controller.createProfile(req, dto)).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(usersService.createProfile).not.toHaveBeenCalled();
    expect(planGeneration.triggerPlanGeneration).not.toHaveBeenCalled();
  });
});
