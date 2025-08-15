import { render } from '@skrift/components';
import { VercelInviteUserDocument } from '../documents/vercel-invite-user';

function App() {
  const documentHtml = render(<VercelInviteUserDocument />);

  return <div dangerouslySetInnerHTML={{ __html: documentHtml }} />;
}

export default App;
