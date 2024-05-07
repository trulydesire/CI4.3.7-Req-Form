<?php

namespace App\Controllers;
use App\Models\ItemModel;

class Home extends BaseController
{
    public function index()
    {
        $session = session();

        if ($session->has("user_id") || $session->has("employeeid")) {

            return view("index");
        } else {
            return redirect()->to(base_url('/'))->withInput()->with('error','Your session is over, please login');
        }
    }

    public function createReqPage()
    {
        $session = session();

        if ($session->has("user_id") || $session->has("employeeid")) {


            $goodsModel = new ItemModel();

            $items = $goodsModel->getItems();

            return view("create-request", ['items' => $items]);
        } else {
            return redirect()->to(base_url('/'))->withInput()->with('error','Your session is over, please login');
        }
    }

    public function listReqPage()
    {
        $session = session();

        if ($session->has("user_id") || $session->has("employeeid")) {

            return view("list-request");
        } else {
            return redirect()->to(base_url('/'))->withInput()->with('error','Your session is over, please login');
        }
    }

    public function itemCreateReq()
    {
        $data = $this->request->getJSON();

        var_dump($data);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Data berhasil diterima',
            'data' => $data
        ]);
    }
}
