## For Mac

### Named volume exmaple ✅ -

```sh
docker run -d \
  --name redis-named \
  -p 5001:6379 \
  -v my-redis-data:/data \
  redis:alpine

  docker run -d \
  --name redis-no-volume \
  -p 5001:6379 \
  redis:alpine
```

clean up -

```sh
docker rm -f redis
docker volume rm my-redis-data
```

### Anonymous volume ❌ -

build image with volume and port

```sh
docker run -d \
  --name redis-anon \
  -p 6380:6379 \
  -v /data \
  redis:alpine
```

You can find the volume with:

```sh
docker inspect redis-anon | grep -A 5 Mounts
```

### Host Bind Mount + Ports ✅ (best for dev) (משתמשים ב host כדי לאחסן עליו)

```sh
mkdir -p ./redis-data

docker run -d \
  --name redis-bind \
  -p 6381:6379 \
  -v $(pwd)/redis-data:/data \
  redis:alpine
```

clean up -

```sh
# Remove a container
docker rm -f redis-named

# Remove a named volume
docker volume rm my-redis-data

# Remove all unused anonymous volumes
docker volume prune
```

### How to inspect volume -

since docker saved the files on VM:
Docker Desktop runs Linux containers inside a lightweight Linux virtual machine (VM) using Apple’s HyperKit or Virtualization.framework (on Apple Silicon).

We can't access the directory, so we need to inspect it with docker CLI -

```sh
docker volume inspect my-redis-data
```

## For Windows

### Host Bind Mount + Ports ✅ (best for dev) (משתמשים ב host כדי לאחסן עליו)

```sh
docker run -d ^
  --name redis ^
  -p 6379:6379 ^
  -v C:\Users\Shay\redis-data:/data ^
  redis

```
