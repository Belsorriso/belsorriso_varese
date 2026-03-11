import BookingButton from '../shortcodes/BookingButton';
import GoogleMap from '../shortcodes/GoogleMap';
import PhoneCta from '../shortcodes/PhoneCta';
import SocialLinks from '../shortcodes/SocialLinks';

function ShortcodeRenderer({ settings }) {
  const { shortcode, params = {} } = settings;

  switch (shortcode) {
    case 'booking-button': return <BookingButton params={params} />;
    case 'google-map': return <GoogleMap params={params} />;
    case 'phone-cta': return <PhoneCta params={params} />;
    case 'social-links': return <SocialLinks params={params} />;
    default: return null;
  }
}

export default ShortcodeRenderer;
