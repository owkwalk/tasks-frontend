import React from "react";
import styles from "./Post.module.css";

import { useSelector } from "react-redux";

import { selectProfiles } from "../auth/authSlice";
import { fetchAsyncDelete } from "./postSlice";

import { PROPS_POST } from "../types";

import { BsTrash } from "react-icons/bs";


import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import {
  selectProfile,
} from "../auth/authSlice";

const Post: React.FC<PROPS_POST> = ({ postId, userPost, title, content }) => {
  const profiles = useSelector(selectProfiles);
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const profs = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  if (title) {
    return (
      // <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      //   <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      //     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      //         <tr>
      //             <th scope="col" className="px-6 py-3">
      //                 Name
      //             </th>
      //             <th scope="col" className="px-6 py-3">
      //                 Title
      //             </th>
      //             <th scope="col" className="px-6 py-3">
      //                 Content
      //             </th>
      //             <th scope="col" className="px-6 py-3">
      //             </th>
      //         </tr>
      //     </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  {profs[0]?.nickName}
                </th>
                <td className="px-6 py-4">
                  {title}
                </td>
                <td className="px-6 py-4">
                  {content}
                </td>
                <td className="px-6 py-4 text-right">
                    {(userPost == profile.userProfile) ?
                    (<button
                      onClick={() => dispatch(fetchAsyncDelete(String(postId)))}
                    >
                      <BsTrash />
                    </button>) : (<div></div>)}
                </td>
            </tr>
          </tbody>
      //   </table>
      // </div>
    );
  }
  return null;
};

export default Post;
