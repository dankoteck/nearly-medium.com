import { User } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { createSupabaseServerAuth } from "~/utils/authContext";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createSupabaseServerAuth(ctx);

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    props: {
      initialSession: session,
      user: session?.user ?? null,
    },
  };
};

type Props = {
  user: User | null;
};

export default function Home({ user }: Props) {
  return <main className={`min-h-screen`}>
    
  </main>;
}
