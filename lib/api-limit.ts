import prismadb from "./prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";

export const incrementUserGenerations = async () => {
  const { userId } = auth();
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress!;
  if (!userId) {
    return;
  }
  const userStats = await prismadb.user.findUnique({
    where: { userId: userId },
  });
  if (userStats) {
    await prismadb.user.update({
      where: { userId: userId },
      data: { generations: userStats.generations + 1 },
    });
  } else {
    await prismadb.user.create({
      data: { userId: userId, generations: 1, email: email },
    });
  }
};

export const canGenerate = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userStats = await prismadb.user.findUnique({
    where: { userId: userId },
  });
  if (!userStats || userStats.generations < userStats.maxgenerations) {
    return true;
  } else {
    return false;
  }
};

export const getuserStatsCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return {
      generations: 0,
      maxGenerations: 5,
    };
  }
  const userStats = await prismadb.user.findUnique({
    where: { userId: userId },
  });
  if (!userStats) {
    return {
      generations: 0,
      maxGenerations: 5,
    };
  }
  return {
    generations: userStats.generations,
    maxGenerations: userStats.maxgenerations,
  };
};
