import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Never';
  
  try {
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    }
    
    if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    }
    
    return format(date, 'MMM d, yyyy \'at\' h:mm a');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export const formatRelativeTime = (dateString: string | null): string => {
  if (!dateString) return 'Never';
  
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Invalid date';
  }
};

export const formatDetailedDate = (dateString: string | null): string => {
  if (!dateString) return 'Never';
  
  try {
    const date = parseISO(dateString);
    return format(date, 'EEEE, MMMM d, yyyy \'at\' h:mm:ss a');
  } catch (error) {
    console.error('Error formatting detailed date:', error);
    return 'Invalid date';
  }
};

export const getActivityIcon = (activityType: string) => {
  switch (activityType) {
    case 'form_saved':
      return 'save';
    case 'form_loaded':
      return 'upload';
    case 'form_submitted':
      return 'check-circle';
    case 'login':
      return 'log-in';
    case 'logout':
      return 'log-out';
    case 'profile_updated':
      return 'user';
    case 'dashboard_visited':
      return 'home';
    case 'pro_suite_accessed':
      return 'star';
    case 'coop_welcome_started':
      return 'heart';
    default:
      return 'activity';
  }
};

export const getActivityColor = (activityType: string) => {
  switch (activityType) {
    case 'form_saved':
      return 'text-blue-600 bg-blue-100';
    case 'form_loaded':
      return 'text-purple-600 bg-purple-100';
    case 'form_submitted':
      return 'text-green-600 bg-green-100';
    case 'login':
      return 'text-emerald-600 bg-emerald-100';
    case 'logout':
      return 'text-gray-600 bg-gray-100';
    case 'profile_updated':
      return 'text-indigo-600 bg-indigo-100';
    case 'dashboard_visited':
      return 'text-orange-600 bg-orange-100';
    case 'pro_suite_accessed':
      return 'text-yellow-600 bg-yellow-100';
    case 'coop_welcome_started':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};