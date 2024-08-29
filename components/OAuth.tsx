// import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
// import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  //   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    // const result = await googleOAuth(startOAuthFlow);
    // if (result.code === "session_exists") {
    //   Alert.alert("Success", "Session exists. Redirecting to home screen.");
    //   router.replace("/(root)/(tabs)/home");
    // }
    // Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-center gap-x-3">
        <View className="h-[1px] flex-1 bg-general-100" />
        <Text className="font-JakartaMedium text-lg text-general-200">Or</Text>
        <View className="h-[1px] flex-1 bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-4 w-full rounded-2xl shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="mx-2 h-5 w-5"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
