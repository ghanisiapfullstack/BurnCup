"use client"

import { useState } from "react"
import { CheckCircle, User, UserCheck, Users } from "lucide-react"
import { AuthStep } from "./steps/auth-step"
import { ProfileStep } from "./steps/profile-step"
import { TeamStep } from "./steps/team-step"
import { Competition } from "@/model/competition_model"
import { useRouter } from "next/navigation"

export function OnboardingStepper(
    {
        competition,
    }: {
        competition: Competition
    }
) {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const router = useRouter();

  const steps = [
    {
        id: 1,
        title: "Create Account",
        description: "Sign in with your preferred provider",
        icon: User,
        component: AuthStep,
    },
    {
        id: 2,
        title: "Complete Profile",
        description: "Fill in your personal information",
        icon: UserCheck,
        component: ProfileStep,
    },
    {
        id: 3,
        title: "Join or Create Team",
        description: "Set up your team for the competition",
        icon: Users,
        component: TeamStep,
    },
    ]

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1)
    } else {
      router.push(`/dashboard`);
    }
  }

  const handleStepClick = (stepId: number) => {
    if (stepId <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(stepId)
    }
  }

  const CurrentStepComponent = steps.find((step) => step.id === currentStep)?.component

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Complete Your Registration</h2>
          <p className="text-lg text-gray-600">Follow these steps to join the {competition.name} competition</p>
        </div>

        {/* Stepper Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id)
              const isCurrent = currentStep === step.id
              const isAccessible = step.id <= Math.max(...completedSteps, currentStep)
              const Icon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                      isAccessible ? "hover:scale-105" : "cursor-not-allowed opacity-50"
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div
                      className={`
                      relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200
                      ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : isCurrent
                            ? "bg-blue-600 border-blue-600 text-white"
                            : isAccessible
                              ? "bg-white border-gray-300 text-gray-600 hover:border-blue-400"
                              : "bg-gray-100 border-gray-200 text-gray-400"
                      }
                    `}
                    >
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <div className="mt-2 text-center flex flex-col items-center">
                      <div
                        className={`text-sm font-medium ${
                          isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 max-w-24">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${completedSteps.includes(step.id) ? "bg-green-500" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center p-6 border-b border-gray-200">
            <div className="flex items-center justify-center mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  completedSteps.includes(currentStep) ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              {steps.find((step) => step.id === currentStep)?.title}
            </h3>
            <p className="text-lg text-gray-600">{steps.find((step) => step.id === currentStep)?.description}</p>
          </div>
          <div className="p-6">
            {CurrentStepComponent && (
              <CurrentStepComponent
                competition={competition}
                onComplete={() => handleStepComplete(currentStep)}
                isCompleted={completedSteps.includes(currentStep)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
