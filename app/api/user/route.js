import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/app/utils/getCurrentUser';
import bcrypt from 'bcrypt';

async function getUserData(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user || { error: 'User not found' };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { error: 'Error retrieving user data' };
  }
}

export async function GET(request) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userData = await getUserData(currentUser.userId);

  if (userData.error) {
    return NextResponse.json({ error: userData.error }, { status: 404 });  
  }

  return NextResponse.json({ user: userData });
}


export async function PUT(request) {
  try {
    // Get current user
    const { userId } = await getCurrentUser(request);  

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newName, oldPassword, finalPassword } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updateData = {};

    if (finalPassword) {
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
      if (!isPasswordCorrect) {
        return NextResponse.json({ message: 'Incorrect original password' }, { status: 400 })
      }

      const hashedPassword = await bcrypt.hash(finalPassword, 10);
      updateData.password = hashedPassword;
    }

    if (newName) {
      updateData.name = newName;
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
    }

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



