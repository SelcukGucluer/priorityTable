			class queue{
			
				constructor() {
					this.qArray = [];
					this.priority = 0;
					this.scale = 0;
					this.scaleCounter = 0;
				}

				add(value) {					
					this.qArray.push(value);				
				}
				
				get(){
					return  this.qArray.shift();
				}
				
				isEmpty(){
					var response = true
					if(this.qArray.length > 0)
					{	
						response = false;
					}
					return response;
				
				}
				
				isLast(){
					var response = true
					if(this.qArray.length-1 > 0)
					{	
						response = false;
					}
					return response;
				
				}
			
			}
		
			class Ptable {

				constructor(scale,maxlength) {
					this.Queues = [];
					this.scale = scale;
					this.totalPriority = 0;
					this.maxlength = maxlength;
				}

				add(priority,value) {
					
					var index = this.IndexofPriority(priority,value);
		
					if(index > -1){
						
						this.Queues[index].add(value)
					}
					else if(index == -2){
						

					}
					else{
					
						
						var q = new queue();
						q.priority = priority
						q.add(value)
						this.Queues.push(q);
						this.totalPriority = this.totalPriority + q.priority;
						this.updateTable()
					
					}
					
				}
				
				size(){
				
					var totalSize = 0
				
					for(var i = 0; i< this.Queues.length; i++)
					{
						totalSize = totalSize + this.Queues[i].qArray.length;
					}
					
					return totalSize;
				
				}
				
				
				// girilen öncelik paremetsrsinin öncelik tablosunda hangi indexte olduğunu soyler
				IndexofPriority(priority,value){
					
					var isContains = -1;
					
					for(var i = 0; i< this.Queues.length; i++)
					{
						if(this.Queues[i].priority === priority)
						{
							if(this.Queues[i].qArray.length >= this.maxlength)
							{
								var newpriority = priority +1 ;
								this.add(newpriority,value)
								isContains = -2;
							}
							else
							{
								isContains = i;
								break;
							}
							

						}
					}
					
					return isContains;
				
				}
				
				// tablodaki kuyrukların paremetrelerini günceller boş kuyrukları kaldırır.
				updateTable(){
					
					
					var emptyQueues = [];
					
					
					for(var i = 0; i< this.Queues.length; i++)
					{
						
						if(this.Queues[i].isEmpty()){
							emptyQueues.push(i);
							this.totalPriority = this.totalPriority - this.Queues[i].priority;
						}
					}

					//boş kuyruklar öncelik tablosundan silinir.
					
					for (var i = emptyQueues.length -1; i >= 0; i--){
						this.Queues.splice(emptyQueues[i],1); 
					}
					
				
					// öncelik tablosundaki her kuyruğun yeni sıkala değeri hesplanır ve sıkala sayaçları güncelleneir. 
					
					for(var i = 0; i< this.Queues.length; i++)
					{

						var oldscale = this.Queues[i].scale;
						
						var calculatedscale = Math.round((this.scale * this.Queues[i].priority) / this.totalPriority )
						
						if (calculatedscale > 0){
							this.Queues[i].scale = calculatedscale;
						}
						else{
						
							this.Queues[i].scale = calculatedscale + 1 ;
						
						}
						
						if(this.Queues[i].scaleCounter != 0){
						this.Queues[i].scaleCounter = Math.ceil(this.Queues[i].scale * this.Queues[i].scaleCounter / oldscale)
						}
						else{
							
							this.Queues[i].scaleCounter = this.Queues[i].scale 
						}
					}
				
				}
				
			
				
				get(){
				
					for(var i = 0; i< this.Queues.length; i++)
					{
						if (this.Queues[i].scaleCounter > 0  )
						{
							if( i < this.Queues.length - 1 ){
								
								if(this.Queues[i].isEmpty())
								{
									this.Queues[i].scaleCounter =0;
									continue;								
								}
								else
								{
									this.Queues[i].scaleCounter--;
									return this.Queues[i].get();
									
								}
							
							
							}
							else
							{
							
								if(this.Queues[i].scaleCounter -1 > 0){
									
									
									if(this.Queues[i].isEmpty())
									{
										this.Queues[i].scaleCounter =0;
										continue;
									}
									else
									{
										if(this.Queues[i].qArray.length-1 > 0){
										
											this.Queues[i].scaleCounter--;
											return this.Queues[i].get();
										
										}
										else{
										
											this.Queues[i].scaleCounter--;
											var value = this.Queues[i].get();
											this.updateTable();
											return value;
											
										}
										
									}
								
								}
								else{
									
									if(this.Queues[i].isEmpty())
									{
										this.Queues[i].scaleCounter =0;
										continue;										
									}
									else
									{
										this.Queues[i].scaleCounter--;
										var value = this.Queues[i].get();
										this.updateTable();
										return value;
																				
									}
								
								}
								


							}

							
						}
						else
						{
							
							if( i == this.Queues.length - 1 ){
							

								this.updateTable();
							
							}
							
								
								
						}
					}
				}

			}