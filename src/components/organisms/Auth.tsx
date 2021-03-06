import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider, storage } from "../../firebase";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import GitHubIcon from "@material-ui/icons/GitHub";

const Auth: React.FC = () => {
  const signInTwitter = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="text-center bg-main-color">
      <div className="">
        <p className="text-5xl p-10 font-bold">Food Invite</p>
        <p className="m-5">
          サービスを利用するにはTwitterでログインが必要です。
        </p>
        <button
          className="bg-sub-color p-2 my-5 rounded-2xl text-center"
          onClick={signInTwitter}
        >
          <LockOpenIcon />
          &nbsp;Sign In with Twitter
        </button>
        <p className="text-2xl p-5 mt-5">このアプリは何？</p>
        <p>・知り合いをご飯に誘うハードルを下げること </p>
        <p>・地元民がお勧めする飲食店を知ること</p>
        <p>を目的としたアプリです</p>
        {/* <p>具体的には、以下の自分の経験を解決するために開発しました</p>
        <p>・あまり親交はないが一緒にご飯に行って話を聞きたいという経験</p>
        <p>
          ・旅行などで外食の際、食○ログで上位の店に行くのではなく、旅行先の地元民がお勧めする店に行きたいという経験
        </p>
        <p>・友達とご飯に行く際、食べに行く店がなかなか決まらなかった経験</p> */}
        <div className=" p-5 ">
          <p className="text-2xl mt-10">このアプリでできることは？</p>
          <p className=" mt-5 ">
            ・行きたい飲食店リスト、お気に入り飲食店リストなどといったリストを作成できます（イメージはAmazonの欲しいものリスト）
          </p>
          <br />
          <p>
            ・共同編集でみんなでリストを作成できます（例えば鹿児島旅行のときに外せないとんかつ屋さんのリストに対して店追加のリクエストができる）
          </p>
          <br />
          <p>
            ・Twitterで今日のご飯行く相手の募集ができます（自分の行きたい店リストをtwitterに共有し、行きたい人がいたらDMに通知される）
          </p>
          <br />
          <p>
            ・都道府県ごとにリスト、お店を検索できます（旅行先のご飯を決めるときはFood
            Inviteで検索！）
          </p>
          <br />
          <p></p>
        </div>
        <p className="mt-10 mb-5">ソースコード⬇︎</p>
        <a href="https://github.com/shuntatakemoto/food-invite">
          <button className="bg-sub-color p-2  rounded-2xl text-center">
            <GitHubIcon />
            &nbsp;Githubを開く
          </button>
        </a>
        <p className="mt-10">
          作成者:
          <a href="https://twitter.com/haruta_8_">&nbsp;@haruta_8_</a>
        </p>
        <p></p>
      </div>
    </div>
  );
};

export default Auth;
