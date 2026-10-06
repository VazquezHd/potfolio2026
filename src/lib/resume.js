/** Keep document selection explicit; never translate filenames or URLs. */
export function selectResume(resumes, language) {
  return resumes[language === 'en' ? 'en' : 'es']
}
