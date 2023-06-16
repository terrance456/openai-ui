interface UserResponseType {
  userId: string;
  email: string;
  credits: number;
}

export function formatUserInformation(info: FirebaseFirestore.DocumentData) {
  if (!info) {
    return {};
  }
  const userInfo: UserResponseType = { userId: "", email: "", credits: 0 };
  Object.keys(userInfo).forEach((value: string) => {
    Object.assign(userInfo, { [value]: info[value] });
  });
  return userInfo;
}
