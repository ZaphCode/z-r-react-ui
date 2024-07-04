import { loadStripe } from "@stripe/stripe-js";

export const getStripe = async () => {
  try {
  return await loadStripe(
    "pk_test_51MOBXpG8UXDxPRbaBv41bKqV9i6l8bRHrk3SIIaAX82KIREPkczI6RE7fMS99fDc4uQxOnuZuuAfl3VyAjw4czYT00yxTqZ0PE"
  );
  } catch (error) {
    console.error(error);
  }
};
