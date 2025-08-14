import { render } from '@skrift/components';
import { VercelInviteUserEmail } from '../emails/vercel-invite-user';

function App() {
  const emailHtml = render(<VercelInviteUserEmail />);

  return <div dangerouslySetInnerHTML={{ __html: emailHtml }} />;
}

export default App;
