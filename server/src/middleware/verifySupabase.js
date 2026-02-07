import { getSupabaseClient } from '../lib/supabase.js';
import { InvalidTokenError, UnauthorizedError } from '../errors/appError.js';

const verifySupabase = async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return next(new UnauthorizedError('Supabase is not configured on the server'));
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return next(new InvalidTokenError('Missing Authorization bearer token'));
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return next(new InvalidTokenError());
    }

    req.supabaseUser = data.user;
    return next();
  } catch (err) {
    return next(err);
  }
};

export default verifySupabase;
