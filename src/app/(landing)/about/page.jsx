import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

export default function AboutPage() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="container py-24 md:pb-12">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-wide md:text-5xl text-main-tint">About Adsync</h1>
              <p className="text-muted-foreground">
                Adsync is a SMMA&apos;s management application developed by Lautaro Leguizamón, a front-end developer from Argentina.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-main-tint">Mission</h2>
              <p className="text-muted-foreground">
                The mission of this platform is to provide an easy-to-use management app to agency owners who want to manage their social media campaigns, track performance and grow their clients&apos; brands.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-main-tint">Get in Touch</h2>
              <p className="text-muted-foreground">
                If you have any feedback or would like to collaborate on a project, feel free to reach out to me. You
                can contact me through the following channels:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:lautaromateol@gmail.com" target="_blank" className="text-foreground hover:underline">
                    lautaromateol@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <GithubIcon className="h-5 w-5 text-muted-foreground" />
                  <a href="https://github.com/lautaromateol" target="_blank" className="text-foreground hover:underline">
                    lautaromateol
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="h-5 w-5 text-muted-foreground" />
                  <a href="https://www.linkedin.com/in/lautaro-mateo-leguizamon-35b902279/" target="_blank" className="text-foreground hover:underline">
                    Lautaro Mateo Leguizamón
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}