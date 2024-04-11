import GoogleIcon from "../../../components/icons/GoogleIcon";
import DiscordIcon from "../../../components/icons/DiscordIcon";
import GithubIcon from "../../../components/icons/GithubIcon";
import { getOAuthURLAPICall } from "../../../api/auth";

const OAuthButtons = () => {
  const openOAuthPage = async (provider: "google" | "github" | "discord") => {
    const [resp, err] = await getOAuthURLAPICall(provider);

    if (err) return alert("Error login with that provider");

    window.location.href = resp;
  };

  return (
    <div className="flex justify-center mt-4 gap-6 border-dotted border-neutral-300 w-3/4 border-t-2 pt-6">
      <div
        className="w-16 h-16 cursor-pointer flex items-center justify-center bg-red-600 rounded-full"
        onClick={async () => await openOAuthPage("google")}
      >
        <GoogleIcon />
      </div>
      <div
        className="w-16 h-16 cursor-pointer flex items-center justify-center discord-bg rounded-full"
        onClick={async () => await openOAuthPage("discord")}
      >
        <DiscordIcon />
      </div>
      <div
        className="w-16 h-16 cursor-pointer flex items-center justify-center bg-black rounded-full"
        onClick={async () => await openOAuthPage("github")}
      >
        <GithubIcon />
      </div>
    </div>
  );
};

export default OAuthButtons;
