"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Register
 * 1) User supplies email and password
 * 2) email link to verify user
 * 3) on click, user is verified and can log in with password
 * 4) user logs in - create User Token and return
 *
 * Log in
 * 1) User supplies email and password
 * 2) create token and return to user
 *
 * Standard API call
 * 1) method call with token attached
 * 2) verify token, return security context
 * 3) if all good, proceed with method
 *
 * Reset password
 * 1) call to reset made (auth not necessary)
 * 2) email link to user email (containing timestamp reset token)
 * 3) on click, page for reset is loaded, on submit api call made with reset token
 * 4) if reset token matches within timestamp, then reset password
 */
