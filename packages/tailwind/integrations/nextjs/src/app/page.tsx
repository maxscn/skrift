import { render } from '@skrift/components';
import { VercelInviteUserDocument } from '../../documents/vercel-invite-user';

export default async function Home() {
  const documentHtml = await render(<VercelInviteUserDocument />);
  return <div dangerouslySetInnerHTML={{ __html: documentHtml }} />;
}
