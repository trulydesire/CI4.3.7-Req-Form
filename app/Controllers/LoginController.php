<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Mlogin;

class LoginController extends BaseController
{
    public function index()
    {
        $session = session();

        // Memeriksa kedua kunci sesi
        if ($session->has("user_id") || $session->has("employeeid")) {
            // Jika kedua kunci sesi ada, alihkan pengguna ke halaman tertentu
            return redirect()->to(base_url("index"));
        } else {
            // Jika salah satu atau kedua kunci sesi tidak ada, tampilkan halaman login
            return view('login');
        }
    }


    public function login()
    {
        $modelLogin = new Mlogin();

        $username = trim($this->request->getPost('username'));
        $passwordInput = trim($this->request->getPost('password'));

        $cekUsername = $modelLogin->checking_username($username);

        if (count($cekUsername) > 0) {
            $password = $cekUsername[0]["user_password"];

            if (password_verify($passwordInput, $password)) {
                $user_id = $cekUsername[0]["user_id"];

                $checkUser = $modelLogin->checking_user($username, $password);

                // print_r($checkUser);
                // die();

                if ($checkUser['status']) {
                    session()->set('user_id', $user_id);

                    return redirect()->to(base_url('index'))->withInput()->with('sucess', 'Login successful!');
                } else {
                    return redirect()->to(base_url('/'))->withInput()->with('error', 'Your account is non active !');
                }
            } else {
                return redirect()->to(base_url('/'))->withInput()->with('error', 'Login failed, please check username or password !');
            }
        } else {
            return redirect()->to(base_url('/'))->withInput()->with('error', 'Username not found!');
        }
    }

    public function loginEmployee()
    {
        $employeeid = trim($this->request->getPost('employeeid'));

        $dataEmployeeid = ['123456', '123123', '321321'];

        $validEmployee = false;

        foreach ($dataEmployeeid as $validId) {
            if ($employeeid === $validId) {
                $validEmployee = true;
                break;

            }
        }

        // print_r($validEmployee);
        //         die();

        if ($validEmployee) {
            session()->set('employeeid', $employeeid);
            return redirect()->to(base_url('index'));
        } else {
            return redirect()->to(base_url('/'))->withInput()->with('error', "NIK Employee doesn't exist, try again!");
        }
    }



    public function logout()
    {
        session()->remove('user_id');
        session()->remove('employeeid');

        return redirect()->to(base_url('login'));
    }


    // public function register()
    // {
    //     $mlogin = new Mlogin();

    //     $username = 'agus';
    //     $password_input = 'YYYYu7uu';
    //     $hashed_password = password_hash($password_input, PASSWORD_DEFAULT);

    //     $data = array_merge([
    //         'user_id'           => '39',
    //         'user_code'         => 'Agus',
    //         'user_name'         => $username,
    //         'user_password'     => $hashed_password,
    //         'user_employeeid'   => '39',
    //     ]);

    //     $mlogin->add_user($data);

    //     echo "User $username has been registered successfully!";
    // }
}
