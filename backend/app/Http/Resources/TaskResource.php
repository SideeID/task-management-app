<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public $status;
    public $message;
    public $resource;
    public $statusCode;

    public function __construct($status, $message, $resource, $statusCode = null)
    {
        parent::__construct($resource);
        $this->status  = $status;
        $this->message = $message;
        $this->statusCode = $statusCode ?? ($status ? 200 : 500);
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'success'   => $this->status,
            'message'   => $this->message,
            'data'      => $this->resource
        ];
    }

    public function withResponse($request, $response)
    {
        $response->setStatusCode($this->status ? 200 : 500);
    }
}
