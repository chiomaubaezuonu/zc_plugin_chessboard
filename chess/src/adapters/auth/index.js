// Import api call adapter
// import { GetUserInfo } from "@zuri/control";
import { GetWorkspaceUser /** GetUserInfo */ } from "@zuri/control";
import botImage from "../../assets/bot/bot-image.svg";
import defaultProfileImage from "../../assets/profile-image/default-profile-picture-avatar-png-green.png";

let profileImage = defaultProfileImage;

async function getUserProfileImage(email) {
  const { image_url } = await GetWorkspaceUser(email);
  if (image_url !== "") profileImage = image_url;
}

export function getLoggedInUserData() {
  // // Variable to get User Info Data - Mocking Global Variables
  // let logged_in_user_from_zc_main;

  // // Try to set user info from ZC_Main
  // (async function () {
  //   logged_in_user_from_zc_main = await GetUserInfo();
  // })();

  // // Localhost can't use the auth function
  // if (location.hostname === "localhost" && location.hostname === "127.0.0.1") {

  //   // Just return hardcoded info
  //   return {
  //     user_id: "localhost_user_id",
  //     user_name: "LocalhostUser",
  //     image_url: "https://www.gravatar.com/avatar/",
  //   };
  // } else {
  //   // Set timeout to let await resolve (the only hack i could find to make await work in synchronous function)
  //   setTimeout(() => {
  //     return {
  //       user_id: logged_in_user_from_zc_main._id,
  //       user_name: logged_in_user_from_zc_main.first_name + " " + logged_in_user_from_zc_main.last_name,
  //       image_url: `https://ui-avatars.com/api/?name=${logged_in_user_from_zc_main.first_name}&background=random&uppercase=false`,
  //     };
  //   })
  // }

  // Workaround for now (since we use a shared domain)
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    // On localhost return this
    return {
      user_id: "localhost_user_id",
      user_name: "LocalhostUser",
      image_url: "https://www.gravatar.com/avatar/",
    };
  } else {
    let logged_in_user_from_zc_main = JSON.parse(
      sessionStorage.getItem("user")
    );

    getUserProfileImage(logged_in_user_from_zc_main?.email);

    if (!logged_in_user_from_zc_main) {
      // Not Logged In, so return anonymous user info
      return {
        user_id: "anonymous",
        user_name: "Anonymous",
        image_url:
          "https://ui-avatars.com/api/?name=Anonymous&background=random",
      };
    }

    // Logged In, so return user info
    return {
      user_id: logged_in_user_from_zc_main.id,
      user_name:
        logged_in_user_from_zc_main.first_name +
        " " +
        logged_in_user_from_zc_main.last_name,
      image_url: profileImage,
    };
  }
}

export function getCurrentOrganisation() {
  let organisation_id = localStorage.getItem("currentWorkspace");

  if (!organisation_id) {
    return null;
  }

  return organisation_id;
}

export function getAuthToken() {
  let auth_token = sessionStorage.getItem("token");

  if (!auth_token) {
    return null;
  }

  return auth_token;
}

export function getChessBotData() {
  // Later may change to check Bot Info from API call to Backend

  // Temp Fix for now
  return {
    user_id: "chessbot",
    user_name: "Chess Bot",
    image_url: botImage,
  };
}
