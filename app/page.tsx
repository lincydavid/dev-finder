"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
// import { useTheme } from "./contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faLink,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = () => {
  //const { darkMode, toggleDarkMode } = useTheme();

  interface User {
    login: string;
    name: string;
    bio: string;
    id: number;
    avatar_url: string;
    public_repos: string;
    followers: string;
    following: string;
    location: string;
    twitter_username: string;
    url: string;
    html_url: string;
    created_at: string;
    received_events_url: string;
    node_id: string;
  }

  let url = "";

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (textInput !== "") {
      setErrorMessage("");

      url = "https://api.github.com/users/" + textInput;
      event.preventDefault();
      await fetchUser();
    } else {
      setUser(null);
      setErrorMessage("Search field cannot be empty");
    }
  };
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setUser(res.data);
    } catch (error) {
      setUser(null);
      setTextInput("");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-customBackground">
      <div className="flex flex-col h-full">
        <div className="flex justify-between  mt-9">
          <div className="flex items-center">
            <label className="text-white font-extrabold">devfinder</label>
          </div>
          <div className="flex items-center text-white">
            <FontAwesomeIcon className="text-white" icon={faSun} />
          </div>
        </div>

        <div className="rounded p-2 m-2 justify-center items-center flex">
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-white" />
            </div>
            <input
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 bg-customeDiv text-white placeholder-gray-400"
              type="text"
              value={textInput}
              onChange={handleInputChange}
              placeholder="Search"
            />{" "}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Search
          </button>
        </div>
        {errorMessage && (
          <div
            className="rounded mb-2 mt-0 justify-center items-center flex"
            style={{ color: "red" }}
          >
            {errorMessage}
          </div>
        )}
        {loading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin mr-2 text-white"
          />
        ) : (
          ""
        )}
        {user && (
          <div className="bg-customeDiv p-8 rounded-lg text-white">
            <div>
              <div className="flex">
                <div className="w-1/2 m-5">
                  <Image
                    alt={"User Image"}
                    width={150}
                    height={150}
                    className="profile-pic border-4 rounded-full border-solid border-[#5f78a2]"
                    src={user?.avatar_url ? user?.avatar_url : "/images.png"}
                  />
                </div>
                <div className="w-1/2 m-5">
                  <p>{user.name}</p>
                  <p className="text-blue-500 font-bold">{user.id}</p>
                  <p>
                    Joined
                    {" " +
                      new Intl.DateTimeFormat("en-US").format(
                        new Date(user.created_at)
                      )}
                  </p>
                </div>
              </div>
              <div className="flex p-4 text-white mb-2"></div>
              <div className="max-w-lg mx-auto">
                <p className="text-center mb-5">{user.bio}</p>
              </div>
              <div className="flex bg-customBackground p-2 text-white mb-2">
                <div className="w-1/2">
                  <label>Repos</label>
                  <p>{user.public_repos ? user.public_repos : "-"}</p>
                </div>
                <div className="w-1/2">
                  <label>Followers</label>
                  <p>{user.followers}</p>
                </div>
                <div className="w-1/2">
                  <label>Following</label>
                  <p>{user.followers}</p>
                </div>
              </div>
              <div className="flex p-2 text-white mb-2">
                <div className="w-1/2">
                  <FontAwesomeIcon icon={faMapMarker} className="text-white" />
                  <label className="m-1 text-sm">
                    {user.location ? user.location : "Not Available"}
                  </label>
                </div>
                <div className="w-1/2 text-right">
                  <FontAwesomeIcon icon={faTwitter} className="text-white" />
                  <label className="m-1 text-sm">
                    {user.twitter_username
                      ? user.twitter_username
                      : "Not Available"}
                  </label>
                </div>
              </div>
              <div className="flex p-2 text-white mb-2">
                <div className="w-1/2">
                  <FontAwesomeIcon icon={faLink} className="text-white" />
                  <label className="m-1 text-sm">
                    {user.html_url ? user.html_url : "Not Available"}
                  </label>
                </div>
                <div className="w-1/2 text-right">
                  <FontAwesomeIcon icon={faBuilding} className="text-white" />
                  <label className="m-1 text-sm">
                    {"Not Available"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
