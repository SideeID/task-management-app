<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
	use HasFactory;

	public const STATUS_PENDING = 'pending';
	public const STATUS_DONE = 'done';

	protected $table = 'tasks';

	protected $fillable = [
		'title',
		'status',
	];

	protected $casts = [
		'id' => 'integer',
		'title' => 'string',
		'status' => 'string',
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];
}
