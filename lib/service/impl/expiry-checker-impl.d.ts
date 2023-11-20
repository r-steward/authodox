import { DateProvider } from '../date-provider';
import { ExpiryChecker } from '../expiry-checker';
/**
 * Check the token date is not past expiry
 */
export declare class ExpiryCheckerImpl implements ExpiryChecker {
    private readonly _dateProvider;
    constructor(dateProvider: DateProvider);
    isValid(expiry: Date): boolean;
}
