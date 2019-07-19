import * as React from 'react';

interface IAnchorProps {
  content: string;
  className?: string;
  href: string;
}

const Anchor = (props: IAnchorProps) => {
  const { content = '', className, href = '#' } = props;
  const clName = `${className} nav-link`;

  return (
    <div>
      <a className={clName} href={href}>
        {content}
      </a>
    </div>
  );
};

export default Anchor;
