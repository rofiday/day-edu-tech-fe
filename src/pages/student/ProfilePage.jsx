import { toast } from "react-hot-toast";
import { useProfileStore } from "@/store/useProfileStore";
import { useEffect } from "react";
import { useComponentStore } from "@/store/useComponentStore";

const ProfilePage = () => {
  const { updateProfileById, formProfile, getProfileById, readerUrl } =
    useProfileStore();
  const { mode } = useComponentStore();

  useEffect(() => {
    getProfileById();
    useComponentStore.setState({ mode: "update" });
  }, [getProfileById]);

  const handleChange = (key, e) => {
    useProfileStore.setState((prevState) => ({
      ...prevState,
      formProfile: {
        ...prevState.formProfile,
        [key]: e.target.value,
      },
    }));
  };

  const handleChangeSocialLinks = (key, e) => {
    const { value } = e.target;

    useProfileStore.setState((prevState) => ({
      ...prevState,
      formProfile: {
        ...prevState.formProfile,
        socialLinks: {
          ...prevState.formProfile.socialLinks,
          [key]: value,
        },
      },
    }));
  };

  const handleChangeImage = (key, e) => {
    const file = e.target.files[0];
    if (!file.type.match(/^image\//)) {
      toast.error("Only images are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum size of image is 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      useProfileStore.setState((prevState) => ({
        ...prevState,
        formProfile: {
          ...prevState.formProfile,
          [key]: file,
        },
      }));
      useProfileStore.setState({ readerUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("folder", "profiles");
      Object.keys(formProfile).forEach((key) => {
        if (key === "socialLinks") {
          formData.append(key, JSON.stringify(formProfile[key]));
        } else {
          formData.append(key, formProfile[key]);
        }
      });
      await updateProfileById(formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.message || "Failed to update profile.");
    }
  };

  return (
    <div className="container mx-auto min-h-screen mt-10 p-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

      <form
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img
              src={
                mode === "update"
                  ? readerUrl
                    ? readerUrl
                    : import.meta.env.VITE_API_URL + formProfile.profileImage
                  : readerUrl
                  ? readerUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
              }
              className="mt-2 w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
              }}
              alt="Course"
            />
          </label>
          <input
            type="file"
            id="profileImage"
            className="hidden"
            onChange={(e) => handleChangeImage("profileImage", e)}
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-gray-700 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            value={formProfile.bio}
            onChange={(e) => handleChange("bio", e)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formProfile.address}
            onChange={(e) => handleChange("address", e)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your address"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-gray-700 font-medium">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formProfile.gender}
            onChange={(e) => handleChange("gender", e)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="block text-gray-700 font-medium"
          >
            Birth Date
          </label>
          <input
            type="date"
            name="birthDate"
            value={
              formProfile?.birthDate
                ? new Date(formProfile.birthDate).toISOString().slice(0, 10)
                : ""
            }
            onChange={(e) => handleChange("birthDate", e)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label
            htmlFor="socialLinks"
            className="block text-gray-700 font-medium"
          >
            Social Links
          </label>
          <label htmlFor="facebook" className="block text-gray-700 font-medium">
            Facebook
          </label>
          <input
            type="text"
            value={formProfile?.socialLinks?.facebook}
            onChange={(e) => handleChangeSocialLinks("facebook", e)}
            className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter facebook link"
          />
          <label htmlFor="twitter" className="block text-gray-700 font-medium">
            Twitter
          </label>
          <input
            type="text"
            value={formProfile?.socialLinks?.twitter}
            onChange={(e) => handleChangeSocialLinks("twitter", e)}
            className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter twitter link"
          />
          <label
            htmlFor="instagram"
            className="block text-gray-700 font-medium"
          >
            Instagram
          </label>
          <input
            type="text"
            value={formProfile?.socialLinks?.instagram}
            onChange={(e) => handleChangeSocialLinks("instagram", e)}
            className="w-full border rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter instagram link"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
