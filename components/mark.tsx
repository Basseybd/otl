import { MARK_FILL, MARK_RAILS, MARK_SKEW, MARK_STROKES, MARK_TIES, MARK_VIEWBOX } from "@/lib/paths";

const skew = `matrix(${MARK_SKEW.a} ${MARK_SKEW.b} ${MARK_SKEW.c} ${MARK_SKEW.d} ${MARK_SKEW.e} ${MARK_SKEW.f})`;

/** The OTL masthead mark, exactly as the newsletter draws it. */
export default function Mark({ className, title = "Off The L" }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox={MARK_VIEWBOX} role="img" aria-label={title}>
      <g fill="none" stroke="#9a9a9a" strokeLinecap="round">
        <path d={MARK_RAILS} strokeWidth="3" />
        <path d={MARK_TIES} strokeWidth="2.4" strokeLinecap="butt" />
      </g>
      <g transform={skew}>
        <path d={MARK_FILL} fill="#fff" fillRule="evenodd" />
        <g fill="none" stroke="#9a9a9a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {MARK_STROKES.map((d) => (
            <path key={d.slice(0, 24)} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
