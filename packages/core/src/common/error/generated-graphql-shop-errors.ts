// tslint:disable
/** This file was generated by the graphql-errors-plugin, which is part of the "codegen" npm script. */

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export class ErrorResult {
  readonly __typename: string;
  readonly errorCode: string;
message: Scalars['String'];
}

export class AlreadyLoggedInError extends ErrorResult {
  readonly __typename = 'AlreadyLoggedInError';
  readonly errorCode = 'ALREADY_LOGGED_IN_ERROR' as any;
  readonly message = 'ALREADY_LOGGED_IN_ERROR';
  constructor(
  ) {
    super();
  }
}

export class CouponCodeExpiredError extends ErrorResult {
  readonly __typename = 'CouponCodeExpiredError';
  readonly errorCode = 'COUPON_CODE_EXPIRED_ERROR' as any;
  readonly message = 'COUPON_CODE_EXPIRED_ERROR';
  constructor(
    public couponCode: Scalars['String'],
  ) {
    super();
  }
}

export class CouponCodeInvalidError extends ErrorResult {
  readonly __typename = 'CouponCodeInvalidError';
  readonly errorCode = 'COUPON_CODE_INVALID_ERROR' as any;
  readonly message = 'COUPON_CODE_INVALID_ERROR';
  constructor(
    public couponCode: Scalars['String'],
  ) {
    super();
  }
}

export class CouponCodeLimitError extends ErrorResult {
  readonly __typename = 'CouponCodeLimitError';
  readonly errorCode = 'COUPON_CODE_LIMIT_ERROR' as any;
  readonly message = 'COUPON_CODE_LIMIT_ERROR';
  constructor(
    public couponCode: Scalars['String'],
    public limit: Scalars['Int'],
  ) {
    super();
  }
}

export class EmailAddressConflictError extends ErrorResult {
  readonly __typename = 'EmailAddressConflictError';
  readonly errorCode = 'EMAIL_ADDRESS_CONFLICT_ERROR' as any;
  readonly message = 'EMAIL_ADDRESS_CONFLICT_ERROR';
  constructor(
  ) {
    super();
  }
}

export class IdentifierChangeTokenExpiredError extends ErrorResult {
  readonly __typename = 'IdentifierChangeTokenExpiredError';
  readonly errorCode = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR' as any;
  readonly message = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class IdentifierChangeTokenInvalidError extends ErrorResult {
  readonly __typename = 'IdentifierChangeTokenInvalidError';
  readonly errorCode = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR' as any;
  readonly message = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}

export class IneligiblePaymentMethodError extends ErrorResult {
  readonly __typename = 'IneligiblePaymentMethodError';
  readonly errorCode = 'INELIGIBLE_PAYMENT_METHOD_ERROR' as any;
  readonly message = 'INELIGIBLE_PAYMENT_METHOD_ERROR';
  constructor(
    public eligibilityCheckerMessage: any,
  ) {
    super();
  }
}

export class IneligibleShippingMethodError extends ErrorResult {
  readonly __typename = 'IneligibleShippingMethodError';
  readonly errorCode = 'INELIGIBLE_SHIPPING_METHOD_ERROR' as any;
  readonly message = 'INELIGIBLE_SHIPPING_METHOD_ERROR';
  constructor(
  ) {
    super();
  }
}

export class InsufficientStockError extends ErrorResult {
  readonly __typename = 'InsufficientStockError';
  readonly errorCode = 'INSUFFICIENT_STOCK_ERROR' as any;
  readonly message = 'INSUFFICIENT_STOCK_ERROR';
  constructor(
    public quantityAvailable: Scalars['Int'],
    public order: any,
  ) {
    super();
  }
}

export class InvalidCredentialsError extends ErrorResult {
  readonly __typename = 'InvalidCredentialsError';
  readonly errorCode = 'INVALID_CREDENTIALS_ERROR' as any;
  readonly message = 'INVALID_CREDENTIALS_ERROR';
  constructor(
    public authenticationError: Scalars['String'],
  ) {
    super();
  }
}

export class MissingPasswordError extends ErrorResult {
  readonly __typename = 'MissingPasswordError';
  readonly errorCode = 'MISSING_PASSWORD_ERROR' as any;
  readonly message = 'MISSING_PASSWORD_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NativeAuthStrategyError extends ErrorResult {
  readonly __typename = 'NativeAuthStrategyError';
  readonly errorCode = 'NATIVE_AUTH_STRATEGY_ERROR' as any;
  readonly message = 'NATIVE_AUTH_STRATEGY_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NegativeQuantityError extends ErrorResult {
  readonly __typename = 'NegativeQuantityError';
  readonly errorCode = 'NEGATIVE_QUANTITY_ERROR' as any;
  readonly message = 'NEGATIVE_QUANTITY_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NoActiveOrderError extends ErrorResult {
  readonly __typename = 'NoActiveOrderError';
  readonly errorCode = 'NO_ACTIVE_ORDER_ERROR' as any;
  readonly message = 'NO_ACTIVE_ORDER_ERROR';
  constructor(
  ) {
    super();
  }
}

export class NotVerifiedError extends ErrorResult {
  readonly __typename = 'NotVerifiedError';
  readonly errorCode = 'NOT_VERIFIED_ERROR' as any;
  readonly message = 'NOT_VERIFIED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class OrderLimitError extends ErrorResult {
  readonly __typename = 'OrderLimitError';
  readonly errorCode = 'ORDER_LIMIT_ERROR' as any;
  readonly message = 'ORDER_LIMIT_ERROR';
  constructor(
    public maxItems: Scalars['Int'],
  ) {
    super();
  }
}

export class OrderModificationError extends ErrorResult {
  readonly __typename = 'OrderModificationError';
  readonly errorCode = 'ORDER_MODIFICATION_ERROR' as any;
  readonly message = 'ORDER_MODIFICATION_ERROR';
  constructor(
  ) {
    super();
  }
}

export class OrderPaymentStateError extends ErrorResult {
  readonly __typename = 'OrderPaymentStateError';
  readonly errorCode = 'ORDER_PAYMENT_STATE_ERROR' as any;
  readonly message = 'ORDER_PAYMENT_STATE_ERROR';
  constructor(
  ) {
    super();
  }
}

export class OrderStateTransitionError extends ErrorResult {
  readonly __typename = 'OrderStateTransitionError';
  readonly errorCode = 'ORDER_STATE_TRANSITION_ERROR' as any;
  readonly message = 'ORDER_STATE_TRANSITION_ERROR';
  constructor(
    public transitionError: Scalars['String'],
    public fromState: Scalars['String'],
    public toState: Scalars['String'],
  ) {
    super();
  }
}

export class PasswordAlreadySetError extends ErrorResult {
  readonly __typename = 'PasswordAlreadySetError';
  readonly errorCode = 'PASSWORD_ALREADY_SET_ERROR' as any;
  readonly message = 'PASSWORD_ALREADY_SET_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordResetTokenExpiredError extends ErrorResult {
  readonly __typename = 'PasswordResetTokenExpiredError';
  readonly errorCode = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR' as any;
  readonly message = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordResetTokenInvalidError extends ErrorResult {
  readonly __typename = 'PasswordResetTokenInvalidError';
  readonly errorCode = 'PASSWORD_RESET_TOKEN_INVALID_ERROR' as any;
  readonly message = 'PASSWORD_RESET_TOKEN_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}

export class PasswordValidationError extends ErrorResult {
  readonly __typename = 'PasswordValidationError';
  readonly errorCode = 'PASSWORD_VALIDATION_ERROR' as any;
  readonly message = 'PASSWORD_VALIDATION_ERROR';
  constructor(
    public validationErrorMessage: Scalars['String'],
  ) {
    super();
  }
}

export class PaymentDeclinedError extends ErrorResult {
  readonly __typename = 'PaymentDeclinedError';
  readonly errorCode = 'PAYMENT_DECLINED_ERROR' as any;
  readonly message = 'PAYMENT_DECLINED_ERROR';
  constructor(
    public paymentErrorMessage: Scalars['String'],
  ) {
    super();
  }
}

export class PaymentFailedError extends ErrorResult {
  readonly __typename = 'PaymentFailedError';
  readonly errorCode = 'PAYMENT_FAILED_ERROR' as any;
  readonly message = 'PAYMENT_FAILED_ERROR';
  constructor(
    public paymentErrorMessage: Scalars['String'],
  ) {
    super();
  }
}

export class VerificationTokenExpiredError extends ErrorResult {
  readonly __typename = 'VerificationTokenExpiredError';
  readonly errorCode = 'VERIFICATION_TOKEN_EXPIRED_ERROR' as any;
  readonly message = 'VERIFICATION_TOKEN_EXPIRED_ERROR';
  constructor(
  ) {
    super();
  }
}

export class VerificationTokenInvalidError extends ErrorResult {
  readonly __typename = 'VerificationTokenInvalidError';
  readonly errorCode = 'VERIFICATION_TOKEN_INVALID_ERROR' as any;
  readonly message = 'VERIFICATION_TOKEN_INVALID_ERROR';
  constructor(
  ) {
    super();
  }
}


const errorTypeNames = new Set(['AlreadyLoggedInError', 'CouponCodeExpiredError', 'CouponCodeInvalidError', 'CouponCodeLimitError', 'EmailAddressConflictError', 'IdentifierChangeTokenExpiredError', 'IdentifierChangeTokenInvalidError', 'IneligiblePaymentMethodError', 'IneligibleShippingMethodError', 'InsufficientStockError', 'InvalidCredentialsError', 'MissingPasswordError', 'NativeAuthStrategyError', 'NegativeQuantityError', 'NoActiveOrderError', 'NotVerifiedError', 'OrderLimitError', 'OrderModificationError', 'OrderPaymentStateError', 'OrderStateTransitionError', 'PasswordAlreadySetError', 'PasswordResetTokenExpiredError', 'PasswordResetTokenInvalidError', 'PasswordValidationError', 'PaymentDeclinedError', 'PaymentFailedError', 'VerificationTokenExpiredError', 'VerificationTokenInvalidError']);
function isGraphQLError(input: any): input is import('@ecomentor/common/lib/generated-types').ErrorResult {
  return input instanceof ErrorResult || errorTypeNames.has(input.__typename);
}

export const shopErrorOperationTypeResolvers = {
  UpdateOrderItemsResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  RemoveOrderItemsResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  ApplyCouponCodeResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  TransitionOrderToStateResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  ActiveOrderResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  SetOrderShippingMethodResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  AddPaymentToOrderResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  SetCustomerForOrderResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Order';
    },
  },
  NativeAuthenticationResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'CurrentUser';
    },
  },
  AuthenticationResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'CurrentUser';
    },
  },
  RegisterCustomerAccountResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  RefreshCustomerVerificationResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  VerifyCustomerAccountResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'CurrentUser';
    },
  },
  UpdateCustomerPasswordResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  RequestUpdateCustomerEmailAddressResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  UpdateCustomerEmailAddressResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  RequestPasswordResetResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'Success';
    },
  },
  ResetPasswordResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? (value as any).__typename : 'CurrentUser';
    },
  },
};