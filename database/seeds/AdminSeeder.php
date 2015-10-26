<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new \App\User();
        $admin->name = env('ADMIN_NAME');
        $admin->email = env('ADMIN_EMAIL');
        $admin->password = bcrypt(env('ADMIN_PASSWORD'));
        $admin->save();
    }
}
