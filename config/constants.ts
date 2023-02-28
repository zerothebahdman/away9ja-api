export enum PostType {
  IMAGE = 'image',
  TEXT = 'text',
  TEXT_IMAGE = 'text_image',
}

export enum CommentType {
  MAIN_COMMENT = 'mainComment',
  SUB_COMMENT = 'subComment',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say',
}

export enum AccountStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
}

export enum ROLE {
  ADMIN = 'admin', // can invite an unlimited number of users
  USER = 'user', // can invite 5 users
  EXCLUSIVE_USER = 'exclusive_user', // can invite 10 users
}
