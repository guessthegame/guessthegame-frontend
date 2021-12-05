export const UploadRules = ({ className }: { className: string }) => (
  <div className={className}>
    <p>Make sure your screenshot follows those rules:</p>
    <ul className="list-disc ml-5">
      <li>
        The game must have its own page on{' '}
        <b>
          <a target="_blank" rel="noopener noreferrer" href="https://igdb.com">
            igdb.com
          </a>
        </b>
      </li>
      <li>
        The screenshot <b>cannot be taken from Google Images</b> (you need to either take it
        yourself, or from a{' '}
        <a
          style={{ textDecoration: 'underline' }}
          href="https://www.youtube.com/results?search_query=long+play"
          target="_blank"
          rel="noopener noreferrer"
        >
          Long Play
        </a>
        )
      </li>
      <li>
        The screenshot needs to be of <b>good quality</b>
      </li>
      <li>
        If the screenshot has black borders, <b>the borders should be cropped out</b>
      </li>
      <li>
        Unless the screenshot has black borders, don&apos;t crop the image: the whole screen should
        be visible.
      </li>
    </ul>
    <p>
      Any submission not following those rules <b>will be rejected</b>.
    </p>
  </div>
)
